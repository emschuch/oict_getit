# coding: utf-8

load './globals.rb'

namespace(:db) {
  task(:restore) {
    system "dropdb   #{ $config[:database_name] }"
    system "createdb #{ $config[:database_name] }"

    load './db/index.rb'
  }
}

namespace(:api) {
  task(:run, [:env]) { |t, args|
    if args and args[:env] == "production"
      system <<EOF
bundle exec thin --port 3000 --environment production start
EOF

    else
      system <<EOF
bundle exec rerun --dir ./api \
      --pattern "**/*.{rb,markdown}" \
      -- "bundle exec thin -R api/config.ru --port 3000 --environment development start"
EOF

    end
  }
}

task(:console) {
  system "irb -r './globals.rb'"
}

task(:help) {
  print <<EOF

USAGE:
rake [task]

COMMANDS:

help
    This is it... you just ran it.

console
    Connect to the database and open a Ruby REPL.
    (You should have the ./config.rb file already filled out)

    Look at the ./db/utils.rb file to get some ideas.

db:restore
    Drop the database and create a new one.

api:run
    Start an HTTP server with our beloved database.

EOF
}
