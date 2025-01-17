interface UrlProps {
  name: string;
  url: string;
}

export const companyUrls: UrlProps[] = [
  {
    name: "案件一覧",
    url: "/company/project",
  },
  {
    name: "質問一覧",
    url: "/company/question",
  },
  {
    name: "社員一覧",
    url: "/company/resources",
  },
];
