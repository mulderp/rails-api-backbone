class Item < ActiveRecord::Base
  attr_accessible :name, :files

  def files=(args)
    puts args.inspect
  end
end
