<template>
  <div id="crypto">
    <div class="field is-grouped is-grouped-multiline is-justify-content-center">
      <div class="control">
        <div class="tags are-large has-addons" v-for="crypto in cryptos" :key="crypto.id">
          <span class="tag is-dark"> {{ crypto[0] }} </span>
          <span class="tag">${{ crypto[1] }} </span>
        </div>
            <router-link :to="{name: 'transactions'}">
                <button class="button is-link">View Transaction History</button>
            </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cryptos: [],
    };
  },

  async mounted() {
    const response = await axios.get("http://localhost:4000/api/crypto-prices");
    // replace tempData with "response" when deploying
    const data = response.data;
    for (var id in data) {
      // tuple with name and associated price
      this.cryptos.push([data[id].name, parseFloat(data[id].quote.USD.price.toFixed(2)).toLocaleString("en-US")]);
    }
  },
};

// const tempData = {
//   status: {
//     timestamp: "2022-01-19T22:56:27.231Z",
//     error_code: 0,
//     error_message: null,
//     elapsed: 37,
//     credit_count: 1,
//     notice: null,
//   },
//   data: {
//     1: {
//       id: 1,
//       name: "Bitcoin",
//       symbol: "BTC",
//       slug: "bitcoin",
//       num_market_pairs: 9071,
//       date_added: "2013-04-28T00:00:00.000Z",
//       tags: [
//         "mineable",
//         "pow",
//         "sha-256",
//         "store-of-value",
//         "state-channel",
//         "coinbase-ventures-portfolio",
//         "three-arrows-capital-portfolio",
//         "polychain-capital-portfolio",
//         "binance-labs-portfolio",
//         "blockchain-capital-portfolio",
//         "boostvc-portfolio",
//         "cms-holdings-portfolio",
//         "dcg-portfolio",
//         "dragonfly-capital-portfolio",
//         "electric-capital-portfolio",
//         "fabric-ventures-portfolio",
//         "framework-ventures-portfolio",
//         "galaxy-digital-portfolio",
//         "huobi-capital-portfolio",
//         "alameda-research-portfolio",
//         "a16z-portfolio",
//         "1confirmation-portfolio",
//         "winklevoss-capital-portfolio",
//         "usv-portfolio",
//         "placeholder-ventures-portfolio",
//         "pantera-capital-portfolio",
//         "multicoin-capital-portfolio",
//         "paradigm-portfolio",
//       ],
//       max_supply: 21000000,
//       circulating_supply: 18934462,
//       total_supply: 18934462,
//       is_active: 1,
//       platform: null,
//       cmc_rank: 1,
//       is_fiat: 0,
//       last_updated: "2022-01-19T22:55:00.000Z",
//       quote: {
//         USD: {
//           price: 41936.55437183385,
//           volume_24h: 23173610890.929226,
//           volume_change_24h: 2.7918,
//           percent_change_1h: 0.35049842,
//           percent_change_24h: -1.2613196,
//           percent_change_7d: -4.34209197,
//           percent_change_30d: -10.56279703,
//           percent_change_60d: -29.7035417,
//           percent_change_90d: -32.94585965,
//           market_cap: 794046095164.422,
//           market_cap_dominance: 40.1751,
//           fully_diluted_market_cap: 880667641808.51,
//           last_updated: "2022-01-19T22:55:00.000Z",
//         },
//       },
//     },
//     1027: {
//       id: 1027,
//       name: "Ethereum",
//       symbol: "ETH",
//       slug: "ethereum",
//       num_market_pairs: 5438,
//       date_added: "2015-08-07T00:00:00.000Z",
//       tags: [
//         "mineable",
//         "pow",
//         "smart-contracts",
//         "ethereum-ecosystem",
//         "binance-smart-chain",
//         "coinbase-ventures-portfolio",
//         "three-arrows-capital-portfolio",
//         "polychain-capital-portfolio",
//         "binance-labs-portfolio",
//         "blockchain-capital-portfolio",
//         "boostvc-portfolio",
//         "cms-holdings-portfolio",
//         "dcg-portfolio",
//         "dragonfly-capital-portfolio",
//         "electric-capital-portfolio",
//         "fabric-ventures-portfolio",
//         "framework-ventures-portfolio",
//         "hashkey-capital-portfolio",
//         "kenetic-capital-portfolio",
//         "huobi-capital-portfolio",
//         "alameda-research-portfolio",
//         "a16z-portfolio",
//         "1confirmation-portfolio",
//         "winklevoss-capital-portfolio",
//         "usv-portfolio",
//         "placeholder-ventures-portfolio",
//         "pantera-capital-portfolio",
//         "multicoin-capital-portfolio",
//         "paradigm-portfolio",
//       ],
//       max_supply: null,
//       circulating_supply: 119229451.8115,
//       total_supply: 119229451.8115,
//       is_active: 1,
//       platform: null,
//       cmc_rank: 2,
//       is_fiat: 0,
//       last_updated: "2022-01-19T22:55:00.000Z",
//       quote: {
//         USD: {
//           price: 3126.0550486027373,
//           volume_24h: 13269339018.254185,
//           volume_change_24h: 0.5961,
//           percent_change_1h: 0.19722509,
//           percent_change_24h: -1.73255093,
//           percent_change_7d: -7.25111871,
//           percent_change_30d: -19.70802678,
//           percent_change_60d: -29.04851893,
//           percent_change_90d: -23.37291091,
//           market_cap: 372717829777.4764,
//           market_cap_dominance: 18.8614,
//           fully_diluted_market_cap: 372717829777.48,
//           last_updated: "2022-01-19T22:55:00.000Z",
//         },
//       },
//     },
//   },
// };
</script>

<style>
#crypto {
  margin: auto;
  margin-top: 5%;
}
</style>
