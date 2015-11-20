# coding: utf-8

require 'sequel'
require 'pg'

load "#{ __dir__ }/config.rb"

load "#{ __dir__ }/db/utils.rb"

$csv_source_filename = "#{ __dir__ }/db/#{ $config[:csv_filename] }"

$db = Sequel.connect "postgres://#{ $config[:database_user] }:local@#{ $config[:database_host] }/#{ $config[:database_name] }"
