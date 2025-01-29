import { useState, useEffect } from "react";
import {
  Switch,
  Route,
  useLocation,
  useParams,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { styled } from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  a {
    color: ${(props) => props.theme.textColor};
    font-size: 20px;
  }
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 50px;
`;

const Loader = styled.span`
  color: ${(props) => props.theme.textColor};
  text-align: center;
  display: block;
`;

const Description = styled.p`
  margin: 20px 0;
  line-height: 20px;
`;

const CoinInfo1 = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.divColor};
  border-radius: 10px;
  padding: 10px 20px;
`;

const CoinInfo2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;
const Tab = styled.span<{ isactive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.divColor};
  padding: 7px 0;
  border-radius: 10px;
  a {
    font-size: 12px;
    display: block;
    color: ${(props) =>
      props.isactive ? props.theme.accentColor : props.theme.textColor};
    font-weight: ${(props) => (props.isactive ? 800 : 400)};
  }
`;

const Back = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  height: 30px;
  a {
    color: ${(props) => props.theme.textColor};
    font-size: 30px;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  // const [info, setInfo] = useState<InfoData>();
  // const [loading, setLoading] = useState(true);
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId)
    // { refetchInterval: 5000 }
  );

  function CoinInfo() {
    return (
      <>
        <CoinInfo1>
          <CoinInfo2>
            <span>rank:</span>
            <span>{infoData?.rank}</span>
          </CoinInfo2>
          <CoinInfo2>
            <span>symbol:</span>
            <span>{infoData?.symbol}</span>
          </CoinInfo2>
          <CoinInfo2>
            <span>Price :</span>
            <span>{priceData?.quotes.USD.price.toFixed(3)}</span>
          </CoinInfo2>
        </CoinInfo1>

        <Description>{infoData?.description}</Description>
        <CoinInfo1>
          <CoinInfo2>
            <span>total suply:</span>
            <span>{priceData?.total_supply}</span>
          </CoinInfo2>
          <CoinInfo2>
            <span>max suply:</span>
            <span>{priceData?.max_supply}</span>
          </CoinInfo2>
        </CoinInfo1>
        <Tabs>
          <Tab isactive={chartMatch !== null}>
            <Link to={`/${coinId}/chart`}>Chart</Link>
          </Tab>
          <Tab isactive={priceMatch !== null}>
            <Link to={`/${coinId}/price`}>Price</Link>
          </Tab>
        </Tabs>
        <Switch>
          <Route path={`/:coinId/price`}>
            <Price coinId={coinId}></Price>
          </Route>
          <Route path={`/:coinId/chart`}>
            <Chart coinId={coinId}></Chart>
          </Route>
        </Switch>
      </>
    );
  }
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);
  const loading = infoLoading || priceLoading;
  return (
    <Container>
      <Back>
        <Link to="/">←</Link>
      </Back>

      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </Title>
      </Header>
      {loading ? <Loader>loading...</Loader> : <CoinInfo></CoinInfo>}
    </Container>
  );
}

export default Coin;
