import { Provider } from 'react-redux';
import { store } from '@features/app/store';
import "@styles/globals.css"
import { BaseLayout } from "@components/ui/common"

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </Provider>
  ) 
}

export default MyApp
