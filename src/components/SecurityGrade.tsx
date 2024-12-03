import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";

interface SecurityGradeProps {
  grade: string;
}

export const SecurityGrade = ({ grade }: SecurityGradeProps) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return "text-success-DEFAULT";
      case "B":
      case "C":
        return "text-warning-DEFAULT";
      default:
        return "text-danger-DEFAULT";
    }
  };

  const getGradeIcon = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return <ShieldCheck className="w-12 h-12" />;
      case "B":
      case "C":
        return <Shield className="w-12 h-12" />;
      default:
        return <ShieldAlert className="w-12 h-12" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-sm">
      <div className={getGradeColor(grade)}>{getGradeIcon(grade)}</div>
      <h2 className={`text-4xl font-bold mt-2 ${getGradeColor(grade)}`}>
        {grade}
      </h2>
      <p className="text-gray-600 mt-2">Security Grade</p>
    </div>
  );
};