class ItemsController < ApplicationController

  def index
    render :json => Item.all
  end

  def create
    Item.create(params.slice(:name))
  end


end
