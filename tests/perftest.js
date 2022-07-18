import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
  ext: {
    loadimpact: {
      distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
      apm: [],
    },
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '5s',
      stages: [
        { target: 5, duration: '20s' },
        { target: 0, duration: '10s' },
      ],
      gracefulRampDown: '0s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  const vars = {
    base_url: "http://sample-app-frontend-gateway-525eca1d5089dbdc-istio-system.apps.okd.lab.mez9.local"
  }

  group(
    'page_2 - ' + vars['base_url'] + '/product/OLJCESPC7Z',
    function () {
      response = http.get(
        vars['base_url'] + '/product/OLJCESPC7Z',
        {
          headers: {
            'upgrade-insecure-requests': '1',
          },
        }
      )

      vars['product_id'] = response.html().find('input[name=product_id]').first().attr('value')

      //sleep(1.9)
    }
  )

  group(
    'page_3 - ' + vars['base_url'] + '/cart',
    function () {
      response = http.post(
        vars['base_url'] + '/cart',
        {
          product_id: `${vars['product_id']}`,
          quantity: '1',
        },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      //sleep(1.8)
    }
  )

  group(
    'page_4 - ' + vars['base_url'] + '/cart/checkout',
    function () {
      response = http.post(
        vars['base_url'] + '/cart/checkout',
        {
          email: 'someone@example.com',
          street_address: '1600 Amphitheatre Parkway',
          zip_code: '94043',
          city: 'Mountain View',
          state: 'CA',
          country: 'United States',
          credit_card_number: '4432-8015-6152-0454',
          credit_card_expiration_month: '1',
          credit_card_expiration_year: '2023',
          credit_card_cvv: '672',
        },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      //sleep(2.1)
    }
  )

  group(
    'page_5 - ' + vars['base_url'],
    function () {
      response = http.get(
        vars['base_url'],
        {
          headers: {
            'upgrade-insecure-requests': '1',
          },
        }
      )
    }
  )
}