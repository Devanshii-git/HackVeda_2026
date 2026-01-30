import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import ScreenshotUploader from "../components/ScreenshotUploader";
import Sidebar from "../components/sidebar";

import {
  IndianRupee,
  PiggyBank,
  TrendingUp,
  Home,
  Search,
  Send,
  Info,
  AlertTriangle,
  Activity
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#6366f1", "#f97316", "#22c55e"];

function Dashboard() {

  const [form, setForm] = useState({
    salary: "",
    expenses: "",
    investments: "",
    savings: "",
    symbol: "",
  });

  const salary = Number(form.salary || 0);
  const expenses = Number(form.expenses || 0);
  const savings = Number(form.savings || 0);
  const surplus = salary - expenses - savings;

  const chartData = [
    { name: "Income", value: salary },
    { name: "Expenses", value: expenses },
    { name: "Savings", value: savings },
  ];

  /* ---------------- HEALTH SCORE ---------------- */

  function calculateHealthScore() {
    if (salary === 0) return 0;

    let score = 100;

    if (expenses > salary * 0.7) score -= 30;
    if (savings < salary * 0.2) score -= 25;
    if (surplus < 0) score -= 30;

    return Math.max(0, Math.min(100, score));
  }

  const healthScore = calculateHealthScore();

  function healthColor() {
    if (healthScore >= 70) return "text-green-400";
    if (healthScore >= 40) return "text-yellow-400";
    return "text-red-400";
  }

  /* ---------------- RISK ALERTS ---------------- */

  const riskAlerts = [];

  if (expenses > salary * 0.7) {
    riskAlerts.push("High spending relative to income");
  }

  if (savings < salary * 0.2) {
    riskAlerts.push("Low savings rate");
  }

  if (surplus < 0) {
    riskAlerts.push("You are spending more than you earn");
  }

  if (riskAlerts.length === 0) {
    riskAlerts.push("No major risks detected");
  }

  /* ---------------- CHAT ---------------- */

  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi 👋 I’m your Financial Twin. Enter your details and ask me anything." }
  ]);

  const [query, setQuery] = useState("");
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef(null);

  const quickQuestions = [
    "Can I afford a ₹30,000 purchase?",
    "How can I save more each month?",
    "Build a monthly budget for me",
    "Is my investment strategy risky?"
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function callStockAI(userQuery) {
    const res = await fetch(
      "https://2qlxsj0coh.execute-api.us-east-1.amazonaws.com/dev/process",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salary,
          expenses,
          savings,
          investment: form.investments,
          symbol: form.symbol,
          query: userQuery,
        }),
      }
    );

    const wrapper = await res.json();
    const data = JSON.parse(wrapper.body);
    return data.answer;
  }

  async function handleSend(text = query) {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: "user", text }]);
    setQuery("");
    setTyping(true);

    try {
      const answer = await callStockAI(text);
      setMessages(prev => [...prev, { role: "ai", text: answer }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "⚠️ Failed to get response." }]);
    }

    setTyping(false);
  }

  function handleQuickQuestion(q) {
    handleSend(q);
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-white">

      <Sidebar />

      <div className="flex-1 ml-64 p-10 flex flex-col overflow-hidden">

        <h1 className="text-3xl font-bold mb-2">Financial Twin Workspace</h1>
        <p className="text-gray-400 mb-6">Enter your financial details and ask questions</p>

        {/* TOP CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">

          <Card title="Income" value={salary} />
          <Card title="Expenses" value={expenses} />
          <Card title="Savings" value={savings} />
          <Card title="Surplus" value={surplus} highlight />

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <Activity className={`mx-auto mb-1 ${healthColor()}`} />
            <p className="text-gray-400 text-sm">Health Score</p>
            <h3 className={`text-2xl font-bold ${healthColor()}`}>
              {healthScore}/100
            </h3>
          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">

          {/* LEFT */}
          <div className="flex flex-col gap-6 h-full overflow-hidden">

            {/* FORM */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl overflow-y-auto">

              <Field icon={IndianRupee} label="Salary" name="salary"
                info="Total monthly income including salary, rental income, interest, freelance etc."
                onChange={handleChange} />

              <Field icon={Home} label="Expenses" name="expenses"
                info="Rent, bills, EMIs, food, transport, lifestyle."
                onChange={handleChange} />

              <Field icon={TrendingUp} label="Investments" name="investments"
                info="Stocks, mutual funds, FDs, ETFs, bonds."
                onChange={handleChange} />

              <Field icon={PiggyBank} label="Savings" name="savings"
                info="Emergency fund or goal savings."
                onChange={handleChange} />

              <Field icon={Search} label="Symbol" name="symbol"
                info="Asset symbol like AAPL, BTCUSD"
                onChange={handleChange} />

              <ScreenshotUploader
                userData={{ salary, expenses, savings, investment: form.investments }}
                onAnswer={(answer) =>
                  setMessages(prev => [...prev, { role: "ai", text: answer }])
                }
              />

            </div>

            {/* PIE */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">

              <h2 className="mb-4 font-semibold">Financial Distribution</h2>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={chartData} dataKey="value" innerRadius={70} outerRadius={110}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col overflow-hidden">

            <h2 className="font-semibold mb-2">Risk Alerts</h2>

            <div className="mb-4 space-y-2">
              {riskAlerts.map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <AlertTriangle size={14} className="text-yellow-400" />
                  {r}
                </div>
              ))}
            </div>

            <h2 className="font-semibold mb-2">Financial Assistant</h2>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">

              {messages.map((msg, i) => (
                <div key={i}
                  className={`max-w-[75%] px-4 py-3 rounded-xl text-sm
                  ${msg.role === "user" ? "ml-auto bg-indigo-500" : "bg-white/10"}`}>
                  {msg.role === "ai"
                    ? <ReactMarkdown>{msg.text}</ReactMarkdown>
                    : msg.text}
                </div>
              ))}

              {typing && <div className="bg-white/10 px-4 py-2 rounded-xl animate-pulse w-fit">Typing...</div>}
              <div ref={bottomRef} />

            </div>

            {/* QUICK QUESTIONS */}
            <div className="flex flex-wrap gap-2 my-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  className="bg-white/10 hover:bg-indigo-500/30 text-xs px-3 py-1 rounded-full"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* INPUT */}
            <div className="flex gap-3">

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask something..."
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3"
              />

              <button
                onClick={() => handleSend()}
                className="bg-indigo-500 hover:bg-indigo-600 p-3 rounded-xl">
                <Send size={18} />
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

/* COMPONENTS */

function Field({ label, icon: Icon, name, onChange, info }) {
  return (
    <div className="mb-5">

      <div className="flex gap-2 items-center mb-1">
        <span className="text-sm text-gray-400">{label}</span>

        <div className="relative group">
          <Info size={14} className="text-gray-400" />
          <div className="absolute hidden group-hover:block bg-black text-xs p-3 w-64 rounded-lg border border-white/10 top-6">
            {info}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 bg-black/40 border border-white/10 rounded-lg">
        <Icon size={16} className="text-indigo-400" />
        <input
          name={name}
          onChange={onChange}
          placeholder="Enter amount"
          className="bg-transparent outline-none w-full"
        />
      </div>

    </div>
  );
}

function Card({ title, value, highlight }) {
  return (
    <div className={`bg-white/5 border border-white/10 rounded-xl p-4 ${highlight && value < 0 ? "border-red-500" : ""}`}>
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-xl font-bold">₹{value}</h3>
    </div>
  );
}

export default Dashboard;
