# coding: utf-8

if $db.tables.empty?
  load "#{ __dir__ }/build.rb"
end

print "Found the following tables #{ $db.tables } \n"

print "There are no entries in the database, populate some? \n"
load "#{ __dir__ }/utils.rb"

print "Give me an integer or (a)ll (n)one (q)uit: "

input = STDIN.gets.chomp

if input.downcase == "q"
  print "Exiting...\n"
  exit

elsif ["all", "a"].include? input.downcase
  print "
  Importing everything!
  That's a lot of entries and the terminal might be a bottle neck. I'll be REALLY quiet...
  "

  $super_quiet = true

  insert_entries nil

elsif input.to_i > 0
  print "Importing #{ input.to_i } entries from #{ $csv_source_filename }\n\n"

  if input.to_i > 200
    print "That's a lot of entries and the terminal might be a bottle neck. I'll be a bit quiet...\n"
    $quiet = true
  end

  insert_entries input.to_i

else
  print "Importing nothing...\n"
  exit

end
