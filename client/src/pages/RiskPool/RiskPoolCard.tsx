import FundForm from "@/components/functions/FundForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Pool from "@/components/interfaces/Pool";

interface RiskPoolCardProps {
  pool: Pool;
}

export default function RiskPoolCard(pool: RiskPoolCardProps) {
  const { riskLevel, icon: Icon, color, features, rewardSystem } = pool.pool;
  return (
    <Card className={`${color} border-2`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl">{riskLevel} Risk</span>
          <Icon className="w-8 h-8" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2 mb-4">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <p className="font-semibold">Reward System:</p>
        <p>{rewardSystem}</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full text-black">Add Funds</Button>
          </DialogTrigger>
          <FundForm {...pool.pool} />
        </Dialog>
        <Button variant="outline" className="w-full text-text hover:text-black">
          Claim Rewards
        </Button>
      </CardFooter>
    </Card>
  );
}
