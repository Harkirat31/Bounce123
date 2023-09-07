import requests


def getLatLong(address):

    # Replace 'YOUR_API_KEY' with your actual API key
    api_key = 'AIzaSyANu4rP79yzZDjyHT3ExDgGb_6gh9IxbwE'


# Create the API request URL
    base_url = 'https://maps.googleapis.com/maps/api/geocode/json'
    params = {'address': address, 'key': api_key}

    response = requests.get(base_url, params=params)

# Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        if data['status'] == 'OK':
            # Extract latitude and longitude from the response
            location = data['results'][0]['geometry']['location']
            latitude = location['lat']
            longitude = location['lng']
            print(f'Latitude: {latitude}, Longitude: {longitude}')
            return [latitude, longitude]
        else:
            print(f'Geocoding failed with status: {data["status"]}')
    else:
        print(f'Request failed with status code: {response.status_code}')
