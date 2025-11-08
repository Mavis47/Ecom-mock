import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Checkout() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-center font-semibold">
            Checkout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>Confirm your order and proceed to payment.</p>
          <Button className="w-full">Proceed to Pay</Button>
        </CardContent>
      </Card>
    </div>
  );
}
