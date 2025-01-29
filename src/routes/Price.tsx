import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinPrice } from "../api";
import { PriceData } from "./Coin";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px 0;
`;

const PriceList = styled.ul``;
const PriceDetail = styled.li`
  background-color: whitesmoke;
  padding: 10px;
  color: black;
  font-size: 12px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const Loader = styled.span`
  color: white;
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  color: "black";
  font-weight: 800;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;
const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 700;
  background-color: ${(props) => props.theme.priceBoxColor};
  padding: 15px 0;
  border-radius: 15px;
  color: ${(props) => props.theme.textColor};
`;
interface IPrice {
  coinId: string;
}

function Price({ coinId }: IPrice) {
  const { isLoading, data } = useQuery<PriceData>(["pricedata", coinId], () =>
    fetchCoinPrice(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Please wait a moment..."
      ) : (
        <Container>
          <Header>
            <Title>{coinId} Price Change History</Title>
          </Header>

          <PriceList>
            <PriceDetail>
              최근 15분 : {data?.quotes.USD.percent_change_15m}%
            </PriceDetail>
            <PriceDetail>
              최근 30분 : {data?.quotes.USD.percent_change_30m}%
            </PriceDetail>
            <PriceDetail>
              최근 1시간 : {data?.quotes.USD.percent_change_1h}%
            </PriceDetail>
            <PriceDetail>
              최근 6시간 : {data?.quotes.USD.percent_change_6h}%
            </PriceDetail>
            <PriceDetail>
              최근 12시간 : {data?.quotes.USD.percent_change_12h}%
            </PriceDetail>
            <PriceDetail>
              최근 24시간 : {data?.quotes.USD.percent_change_24h}%
            </PriceDetail>
            <PriceDetail>
              최근 7일 : {data?.quotes.USD.percent_change_7d}%
            </PriceDetail>
            <PriceDetail>
              최근 30일 : {data?.quotes.USD.percent_change_30d}%
            </PriceDetail>
            <PriceDetail>
              최근 1년 : {data?.quotes.USD.percent_change_1y}%
            </PriceDetail>
            <Tabs>
              <Tab>
                역대 최고가 : ${data?.quotes.USD.ath_price.toLocaleString()} USD
              </Tab>
              <Tab>
                최고가 기록일 :{" "}
                {data?.quotes.USD.ath_date
                  ? new Date(data.quotes.USD.ath_date).toLocaleDateString(
                      "kr-KR"
                    )
                  : "No data available"}
              </Tab>
            </Tabs>
          </PriceList>
        </Container>
      )}
    </div>
  );
}
export default Price;
