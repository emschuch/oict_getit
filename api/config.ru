#!/bin/ruby

ENV['RACK_ENV'] ||= "development"

require 'rubygems'
require 'bundler'

Bundler.require

load "#{ __dir__ }/../globals.rb"

load "#{ __dir__ }/index.rb"

run API
