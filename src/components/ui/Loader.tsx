import { PropagateLoader } from "react-spinners";

interface LoaderProps {
  loading: boolean;
  size?: number;
  color?: string;
}

export const Loader = ({ loading, size = 15, color = "#FFD700" }: LoaderProps) => {
  if (!loading) return null;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <PropagateLoader color={color} loading={loading} size={size} />
    </div>
  );
};
