import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import CompanyList from "@/components/answer/company/CompanyList";

const CompanyPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <Card className="w-[80%] max-w-[700px] p-8">
        <CardContent className="pb-0">
          <Input type="text" placeholder="Search..." />
          <CompanyList />
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyPage;
