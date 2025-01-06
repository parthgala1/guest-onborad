import { Card } from "@/components/ui/card";

const ThankYou = () => {
  return (
    <div className="p-8 h-screen flex flex-col justify-center items-center">
      <Card className="p-6 mb-6 shadow-lg">
        <div className="h-72 flex justify-center items-center flex-col text-center">
          <h1 className="font-serif text-3xl">Thank you for your feedback!</h1>
          <p className="text-gray-500 text-lg">
            We appreciate your feedback and will use it to improve our services.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ThankYou;
