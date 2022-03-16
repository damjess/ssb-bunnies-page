"""

Pawlytics API retreival tool
Author: jess@menidae.com
Requires crontab to run tool hourly:
0 * * * * /path/to/python3 /path/to/file/pawlytics.py

"""

from urllib.request import Request
from urllib.request import urlopen
from typing import Dict
from urllib.request import HTTPError
import json
from json import dumps

AUTH0_CLIENT_ID = 'your client id here'
AUTH0_CLIENT_SECRET = 'your client secret here'
AUTH0_AUDIENCE = 'https://api.pawlytics.com'
AUTH0_USER = 'your email here'
AUTH0_PASSWORD = 'your password here'


AUTH0_HEADERS: Dict[str, str] = {
    'Content-Type': 'application/json'
}


AUTH0_URL = 'https://pawlytics.auth0.com/oauth/token'

AUTH0_BODY = dumps({
    'client_id': AUTH0_CLIENT_ID,
    'client_secret': AUTH0_CLIENT_SECRET,
    'audience': AUTH0_AUDIENCE,
    'username': AUTH0_USER,
    'password': AUTH0_PASSWORD,
    'grant_type': 'password',
    'scope': 'openid',
    'response_type': 'token id_token'
})


AUTH0_REQUEST = Request(
    url=AUTH0_URL,
    data=AUTH0_BODY.encode('utf-8'),
    headers=AUTH0_HEADERS,
    method='POST'
)

try:
    AUTH0_RESPONSE = urlopen(AUTH0_REQUEST)
except HTTPError as error:
    print(error.read().decode())
    quit()


AUTH0_RESPONSE_BODY = AUTH0_RESPONSE.read()
AUTH0_DECODED_BODY = AUTH0_RESPONSE_BODY.decode()
AUTH0_JSON_LOADED = json.loads(AUTH0_DECODED_BODY)


TOKEN = AUTH0_JSON_LOADED["access_token"]


HEADERS: Dict[str, str] = {
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Connection': 'keep-alive',
    'DNT': '1',
    'Origin': 'file://',
    'authorization': 'Bearer {token}'.format(
        token=TOKEN
    )
}


URL = 'https://api.pawlytics.com/api/graphql'

BODY = """{"query": "query OrgPets {
  organization_pets(
    organization_id: \\"your organization id\\"
  ){
    status
    adoption_fee{
      amount
      currency
    }
    pet {
      id
      name
      status
      species
      breed_rabbit
      mixed
      estimated_birth_date
      description
      special_needs
      distinguishing_marks
      weight_lbs
      youtube_video_url
      gender
      siblings {
        id
        name
      }
      images {
        url
      }
    }
  }
}"}"""


REQUEST = Request(
    url=URL,
    data=BODY.encode('utf-8'),
    headers=HEADERS,
    method='POST'
)

try:
    RESPONSE = urlopen(REQUEST)
except HTTPError as error:
    print(error.read().decode())
    quit()

RESPONSE_BODY = RESPONSE.read()

with open('response.json', 'w') as writable_file:
    writable_file.write(RESPONSE_BODY.decode())
  