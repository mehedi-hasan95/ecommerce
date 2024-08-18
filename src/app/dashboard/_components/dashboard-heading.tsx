interface Props {
  descripton?: string;
}
export const DashboardHeading = ({ descripton }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p>{descripton}</p>
    </div>
  );
};
