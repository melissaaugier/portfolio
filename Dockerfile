# syntax = docker/dockerfile:1

# --- Base stage ---
ARG RUBY_VERSION=3.3.1
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base

WORKDIR /app

ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development:test"

# --- Build stage ---
FROM base AS build

# Install dependencies for gems and Rails
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
        build-essential git libvips pkg-config postgresql-client libpq-dev nodejs yarn && \
    rm -rf /var/lib/apt/lists/*

# Install gems
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 4 --retry 3 && \
    bundle exec bootsnap precompile --gemfile

# Copy application code
COPY . .

# Precompile Rails assets (without secrets)
RUN SECRET_KEY_BASE=dummy ./bin/rails assets:precompile
RUN bundle exec bootsnap precompile app/ lib/

# --- Final production image ---
FROM base

# Install runtime dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
        curl libsqlite3-0 libvips nodejs yarn && \
    rm -rf /var/lib/apt/lists/*

# Copy built gems and app from build stage
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /app /app

WORKDIR /app

# Create non-root user
RUN useradd rails --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp

USER rails:rails

# Entrypoint prepares the database
ENTRYPOINT ["./bin/docker-entrypoint"]

# Start Rails server by default
EXPOSE 3000
CMD ["./bin/rails", "server", "-b", "0.0.0.0"]
