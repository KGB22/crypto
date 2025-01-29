import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "./atom";

const Toggle = styled.button`
  position: absolute;
  right: 20px;
  font-size: 30px;
  height: 60px;
  width: 60px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
  border: none;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ThemeToggle() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return <Toggle onClick={toggleDarkAtom}>{isDark ? "🌞" : "🌝"}</Toggle>;
}

export default ThemeToggle;
