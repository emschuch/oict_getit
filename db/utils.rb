# coding: utf-8

def all_country_names
  $db[:countries]
    .select(:name, :id)
    .order_by(:name)
    .all
end

def insert_entries stop
  count = 0

  $all_country_names = all_country_names

  $db.transaction {
    IO.foreach($csv_source_filename) { |line|
      break if (count == stop)

      e = line.split(',')
      country_name = e[0]

      # Ignore the header and empty lines...
      #
      next if ["Country", ""].include? country_name

      if not $all_country_names.include? country_name
        create_country(country_name)
      end

      country = $db[:countries].where(:name => country_name).first

      if stop == nil
        if (count % 1000) == 0 then print count.to_s + " " end
        create_entry e, country

      else
        create_entry e, country

      end

      count += 1
    }
  }

  print "\n"
  print "Done!\n"
end

def create_entry array, country
  if $super_quiet
  # shush...

  elsif $quiet
    print "."

  else
    print "Creating entry:\n   #{ array }\n"

  end

  $db[:entries].insert :country_id => country[:id],

                       :distance_existing => array[1].to_f,
                       :distance_planned  => array[2].to_f,
                       :solar_ghi         => array[3].to_f,
                       :pv_cost           => array[4].to_f,
                       :diesel_current    => array[5].to_f,
                       :diesel_nps        => array[6].to_f,
                       :travel_hours      => array[7].to_f,
                       :wind_cf           => array[8].to_f,

                       :x_meters => array[9].to_f,
                       :y_meters => array[10].to_f,

                       :x_degrees => array[11].to_f,
                       :y_degrees => array[12].to_f,

                       :population_2012 => array[13].to_i,
                       :population_2030 => array[14].to_i,

                       :technology_dummy       => array[15],
                       :technology_mini_grid   => array[16],
                       :technology_stand_alone => array[17]

end

def create_country name
  $db[:countries].insert :name => name

  $all_country_names.push name
end

def get_entry_count_by_country array
  $db[:entries]
    .select(:name,
            :technology_dummy,
            Sequel.function(:count, 1))
    .join(:countries, :id => :country_id)
    .where(:name => array)
    .group_by(:name, :technology_dummy)
    .order_by(:name)
end

def location_query proc, opts
  if opts['unit'] == 'meters'
    x_unit = :x_meters
    y_unit = :y_meters

  else
    x_unit = :x_degrees
    y_unit = :y_degrees

  end

  range = {
    x_unit: x_unit,
    x_min: opts['center'][0] - opts['radius'],
    x_max: opts['center'][0] + opts['radius'],

    y_unit: y_unit,
    y_min: opts['center'][1] - opts['radius'],
    y_max: opts['center'][1] + opts['radius']
  }

  proc.call(range,opts)
end

def get_entries_by_location
  lambda { |range,opts|
    q = $db[:entries]
        .select(:id, :country_id, :x_degrees, :y_degrees, :technology_dummy)
        .where(range[:x_unit] => range[:x_min]..range[:x_max],
               range[:y_unit] => range[:y_min]..range[:y_max])

    if opts['technology_dummy']
      q = q.where(:technology_dummy => opts['technology_dummy'])
    end

    return q
  }
end

def get_entry_count_by_location
  lambda { |range,opts|
    $db[:entries]
      .select(:technology_dummy,
              Sequel.function(:count, 1))
      .where(range[:x_unit] => range[:x_min]..range[:x_max],
             range[:y_unit] => range[:y_min]..range[:y_max])
      .group_by(:technology_dummy)
  }
end
