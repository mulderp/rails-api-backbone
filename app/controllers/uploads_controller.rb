class UploadsController < ApplicationController

  def create
    item = Item.create(params.slice(:files))
    render :json => item
  end

end
