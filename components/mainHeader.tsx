import { Header, useRouter } from "@local_modules/router"
import { Button } from "@local_modules/tags"
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";

import ImgPaperAirplane from "assets/images/paperAirplane.svg";

export const MainHeader = () => {

  const { color } = useTheme<Theme>();
  const router = useRouter();

  return (
    <Header
      headerLeft={
        <Button onClick={() => router.back()}>
          <ImgPaperAirplane color={color.primary} width={20} height={20}/>
        </Button>
      }
      title="Hello Header"
      headerRight={
        <Button style={{ marginRight: -20 }}>
          setting
        </Button>
    }></Header>
  )
}
MainHeader.displayName = 'Header';