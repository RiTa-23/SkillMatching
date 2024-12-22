import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AnswererDetailPage = () => {
  const dummyData = {
    name: "エノッキー",
    birthday: "1985/12/22",
    email: "enockey@enockey.com",
    languages: [
      { id: 1, name: "JavaScript", level: 5 },
      { id: 2, name: "TypeScript", level: 5 },
      { id: 3, name: "Python", level: 4 },
      { id: 4, name: "Ruby", level: 3 },
      { id: 5, name: "Go", level: 5 },
      { id: 6, name: "Java", level: 4 },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90vh] space-y-4">
      <Card className="w-[80%] max-w-[800px] p-2">
        <CardHeader>
          <CardTitle>マイスキル</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>氏名</TableCell>
                <TableCell className="text-xl">{dummyData.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>生年月日</TableCell>
                <TableCell className="text-xl">{dummyData.birthday}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>メールアドレス</TableCell>
                <TableCell className="text-xl">{dummyData.email}</TableCell>
              </TableRow>
              <TableRow></TableRow>
            </TableBody>
          </Table>
          <div className="p-4">
            <p>使用可能言語</p>
            <div className="space-x-2 mt-4">
              {dummyData.languages.map((language) => (
                <HoverCard key={language.id}>
                  <HoverCardTrigger>
                    <Badge variant="outline" className="text-lg py-1 px-4 mb-4">
                      {language.name}
                    </Badge>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div>
                      {language.level === 1 && "初心者"}
                      {language.level === 2 && "初級"}
                      {language.level === 3 && "中級"}
                      {language.level === 4 && "上級"}
                      {language.level === 5 && "プロ"}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[80%] max-w-[800px] p-2">
        <CardContent>
          <CardHeader>
            <CardTitle>回答履歴</CardTitle>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>会社名</TableHead>
                    <TableHead>回答日</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>株式会社未来技術</TableCell>
                    <TableCell>2021/12/22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>グローバルソリューションズ株式会社</TableCell>
                    <TableCell>2021/12/22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>クリエイティブマインズ合同会社</TableCell>
                    <TableCell>2021/12/22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ネクストジェンエンタープライズ</TableCell>
                    <TableCell>2021/12/22</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnswererDetailPage;
