import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AnswerHistory = () => {
  const dummyData = [
    { id: 1, name: "株式会社未来技術", date: "2024/12/22" },
    { id: 2, name: "グローバルソリューションズ株式会社", date: "2024/12/22" },
    { id: 3, name: "クリエイティブマインズ合同会社", date: "2024/12/22" },
    { id: 4, name: "ネクストジェンエンタープライズ", date: "2024/12/22" },
  ];

  return (
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
                {dummyData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </CardHeader>
      </CardContent>
    </Card>
  );
};

export default AnswerHistory;
