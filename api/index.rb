# coding: utf-8

class API < Sinatra::Base
  helpers {
    def cleanup_location_params obj
      if not obj['technology_dummy'].nil?
        td = obj['technology_dummy'].strip #.downcase.gsub(" ", "_")
      end

      begin
        it = {
          'radius' => obj['radius'].to_f,
          'center' => [
            obj['center'][0].to_f,
            obj['center'][1].to_f
          ],
          'unit'             => obj['unit'].strip.downcase,
          'technology_dummy' => td
        }

        return it

      rescue
        halt 400, { error:    "Data fed should look like this",
                    solution: { center: [37.0, -7],
                                radius: 5,
                                unit:   "degrees",
                                technology_dummy: "Mini Grid" } }.to_json
      end
    end
  }

  before ('*') {
    content_type :json if defined? content_type
  }

  register Sinatra::Namespace

  namespace('/location') {
    before('*') {
      @clean_params = cleanup_location_params(params)
    }

    get('/entry_count') {
      location_query(get_entry_count_by_location, @clean_params).all.to_json
    }

    get('/entries') {
      location_query(get_entries_by_location, @clean_params).all.to_json
    }
  }

  namespace('/countries') {
    get('/?') {
      all_country_names.all.to_json
    }

    get('/:country_name/?') {
      get_entry_count_by_country(params[:country_name]).all.to_json
    }
  }
end

load "#{ __dir__ }/views.rb"
