# coding: utf-8

$db.create_table?(:countries) {
  primary_key :id

  String :name, :unique => true, :null => false
}

$db.create_table?(:entries) {
  primary_key :id
  foreign_key :country_id, :countries, :null => false

  Float :distance_existing
  Float :distance_planned

  Float :solar_ghi
  Float :pv_cost
  Float :diesel_current
  Float :diesel_nps
  Float :travel_hours
  Float :wind_cf

  Float :x_meters
  Float :y_meters

  Float :x_degrees
  Float :y_degrees

  Integer :population_2012
  Integer :population_2030

  String :technology_dummy
  String :technology_mini_grid
  String :technology_stand_alone
}
