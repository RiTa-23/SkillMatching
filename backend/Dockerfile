FROM php:8.3-apache

# 必要なライブラリをインストール
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install zip pdo_mysql mysqli

# mod_rewrite を有効化
RUN a2enmod rewrite

# Composer のインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Apache の設定
COPY ./apache/000-default.conf /etc/apache2/sites-available/000-default.conf