import {
  QueryClient, QueryClientProvider
} from '@tanstack/react-query';
import "./App.css";
import HomePage from "./pages/home/HomePage";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App
