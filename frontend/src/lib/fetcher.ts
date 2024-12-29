import api from "@/lib/axios";
import axios from "axios";

interface FetcherProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  params?: object;
  headers?: object;
  body?: object;
}

const fetcher = async <T>(
  props: FetcherProps
): Promise<{ data: T | null; error: unknown | null }> => {
  let res;

  try {
    switch (props.method) {
      case "GET":
        res = await api.get(props.url, {
          headers: props.headers,
        });
        break;
      case "POST":
        res = await api.post(props.url, props.body, {
          headers: props.headers,
        });
        break;
      case "PUT":
        res = await api.put(props.url, props?.body, {
          headers: props.headers,
        });
        break;
      case "DELETE":
        res = await api.delete(props.url, {
          headers: props.headers,
        });
        break;
    }
    const { data } = res;

    return { data: data as T, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        data: null,
        error: error.response?.data || error.message,
      };
    }
    if (error instanceof Error) {
      console.log(error);
      return { data: null, error: error };
    }
    console.log(error);
    return { data: null, error: error };
  }
};

export default fetcher;
