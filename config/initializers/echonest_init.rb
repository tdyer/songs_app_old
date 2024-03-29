require 'dotenv'
Dotenv.load

puts ENV['ECHONEST_API_KEY']
puts ENV['ECHONEST_CONSUMER_KEY']
puts ENV['ECHONEST_SHARED_SECRET']
Echowrap.configure do |config|
  config.api_key = ENV['ECHONEST_API_KEY']
  config.consumer_key =  ENV['ECHONEST_CONSUMER_KEY']
  config.shared_secret = ENV['ECHONEST_SHARED_SECRET']
end
