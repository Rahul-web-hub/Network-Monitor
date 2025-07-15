const Dashboard = ({ children }) => {
  return (
    <main className="relative z-10 max-w-7xl mx-auto px-4 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {children}
      </div>
    </main>
  );
};
export default Dashboard;