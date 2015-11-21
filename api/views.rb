# coding: utf-8

class API
  before (%r[/(usage|ajax|curl)?]) {
    content_type 'text/html;charset=utf-8' if not request.xhr?
  }

  get('/?') {
    markdown :index
  }

  get('/:view') {
    begin
      markdown params[:view].to_sym
    rescue
      halt 404, "404: Not found"
    end
  }

  # get('/curl') {
  #   markdown :curl
  # }
end
