import React, { useState, useEffect, useMemo } from 'react';

// ==========================================
// 1. HỆ THỐNG ICON (UI/UX)
// ==========================================
const Icons = {
  Trophy: () => (
    <svg className="w-8 h-8 text-yellow-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l4-2.5V9l-4 2.5L8 9v2.5l4 2.5z" />
    </svg>
  ),
  Streak: () => (
    <svg className="w-6 h-6 text-orange-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Bookmark: ({ marked }) => (
    <svg className={`w-5 h-5 ${marked ? 'fill-sky-400 text-sky-400' : 'text-zinc-400 hover:text-sky-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  ),
  Back: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  ),
  Next: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Brain: () => (
    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Info: () => (
    <svg className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

// ==========================================
// 2. DATA BLOCKS: CƠ SỞ DỮ LIỆU ĐỀ THI TRỐNG
// ==========================================
// Hướng dẫn: Bạn chỉ cần định nghĩa biến chứa bộ đề mới (vd: const MY_SET = [...])
// rồi nạp nó vào mảng EXAM_SETS ở phía dưới để hệ thống tự động render.

const EXAM_SETS = [
  /*
  {
    id: "SET_01",
    title: "Tên bộ đề mới của bạn",
    description: "Mô tả chi tiết nội dung bộ đề.",
    questionCount: MY_SET.length,
    data: MY_SET
  }
  */
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'marathon', 'mock', 'results'
  const [currentExam, setCurrentExam] = useState(null); // Lưu thông tin Bộ đề đang làm
  const [questionsBank, setQuestionsBank] = useState([]); // Mảng câu hỏi được load
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [answersState, setAnswersState] = useState({}); 
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [scoreXP, setScoreXP] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Mock Exam States
  const [mockActive, setMockActive] = useState(false);
  const [mockTimeRemaining, setMockTimeRemaining] = useState(3000);

  // Đồng hồ tính giờ
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
        if (mockActive) {
          setMockTimeRemaining(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              handleMockSubmit();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, mockActive]);

  // Các phương thức kích hoạt chế độ chơi khác nhau
  const startMarathon = (examSet) => {
    setCurrentExam(examSet);
    setQuestionsBank(examSet.data);
    setActiveTab('marathon');
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setAnswersState({});
    setStreak(0);
    setScoreXP(0);
    setTimer(0);
    setIsTimerRunning(true);
    setMockActive(false);
  };

  const startMockExam = (examSet) => {
    setCurrentExam(examSet);
    const shuffled = [...examSet.data].sort(() => 0.5 - Math.random());
    setQuestionsBank(shuffled);
    setActiveTab('mock');
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setAnswersState({});
    setTimer(0);
    setMockTimeRemaining(3000); // 50 phút
    setIsTimerRunning(true);
    setMockActive(true);
  };

  const handleMockSubmit = () => {
    setIsTimerRunning(false);
    setMockActive(false);
    setActiveTab('results');
  };

  // Logic Game hóa khi Submit đáp án
  const handleAnswerSubmit = () => {
    if (selectedOption === null) return;
    
    const question = questionsBank[currentQuestionIdx];
    const isCorrect = selectedOption === question.correctAnswer;
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setScoreXP(prev => prev + 100 + (newStreak >= 3 ? 50 : 0));
    } else {
      setStreak(0);
    }

    setAnswersState(prev => ({
      ...prev,
      [question.id]: {
        selected: selectedOption,
        isCorrect: isCorrect,
        bookmarked: prev[question.id]?.bookmarked || false
      }
    }));

    setIsAnswerSubmitted(true);
  };

  const toggleBookmark = (qId) => {
    setAnswersState(prev => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        bookmarked: !prev[qId]?.bookmarked
      }
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < questionsBank.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      const nextQ = questionsBank[currentQuestionIdx + 1];
      const saved = answersState[nextQ.id];
      if (saved) {
        setSelectedOption(saved.selected);
        setIsAnswerSubmitted(!mockActive);
      } else {
        setSelectedOption(null);
        setIsAnswerSubmitted(false);
      }
      setShowHint(false);
    } else if (!mockActive) {
      setIsTimerRunning(false);
      setActiveTab('results');
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
      const prevQ = questionsBank[currentQuestionIdx - 1];
      const saved = answersState[prevQ.id];
      setSelectedOption(saved ? saved.selected : null);
      setIsAnswerSubmitted(!!saved);
      setShowHint(false);
    }
  };

  // Phân tích kết quả học tập
  const resultsMetrics = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let total = questionsBank.length;
    
    const topicStats = {};
    
    questionsBank.forEach(q => {
      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { total: 0, correct: 0 };
      }
      topicStats[q.topic].total += 1;

      const state = answersState[q.id];
      if (state) {
        if (state.isCorrect) {
          correct += 1;
          topicStats[q.topic].correct += 1;
        } else {
          wrong += 1;
        }
      }
    });

    const unanswered = total - (correct + wrong);
    return { correct, wrong, unanswered, total, topicStats };
  }, [answersState, questionsBank]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ==========================================
  // RENDER UI
  // ==========================================
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Header Điều hướng */}
      <header className="border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('home'); setIsTimerRunning(false); setMockActive(false); }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-sky-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-emerald-500/20">
              UET
            </div>
            <div>
              <h1 className="font-bold text-zinc-50 tracking-wide text-sm sm:text-base">COM1050 - Git Engine</h1>
              <p className="text-xs text-emerald-400 font-mono">v2.0 Modularity</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isTimerRunning && (
              <div className="flex items-center gap-2 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs sm:text-sm font-mono">
                <Icons.Clock />
                <span>{mockActive ? `Còn lại: ${formatTime(mockTimeRemaining)}` : `Thời gian: ${formatTime(timer)}`}</span>
              </div>
            )}
            
            {activeTab !== 'home' && (
              <div className="flex items-center gap-2 text-xs sm:text-sm bg-emerald-950/40 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-800/50">
                <span className="font-bold">{scoreXP}</span>
                <span className="text-emerald-500 font-medium">XP</span>
              </div>
            )}

            {streak > 0 && (
              <div className="flex items-center gap-1 bg-orange-950/40 text-orange-400 px-2.5 py-1.5 rounded-lg border border-orange-800/50 text-xs sm:text-sm">
                <Icons.Streak />
                <span className="font-bold">{streak} Combo!</span>
              </div>
            )}
            
            {activeTab !== 'home' && (
              <button 
                onClick={() => { setActiveTab('home'); setIsTimerRunning(false); setMockActive(false); }}
                className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors py-1.5 px-3 border border-zinc-800 rounded-lg hover:bg-zinc-900"
              >
                Về Trang Chủ
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Vùng hiển thị chính */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* ==========================================
            TRANG CHỦ (Home): Hiển thị Grid Các Bộ Đề
            ========================================== */}
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fadeIn">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-gradient-to-r from-zinc-950 to-zinc-900 py-12 px-6 sm:px-12 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]" />
              <div className="relative z-10">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold tracking-wider uppercase border border-emerald-500/20">
                  UET-VNU Final Sprint
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-4">
                  Hệ Sinh Thái Ôn Thi <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">COM1050</span>
                </h2>
                <p className="text-zinc-400 mt-4 max-w-2xl text-sm sm:text-base leading-relaxed">
                  Trang chủ tự động đồng bộ hóa các bộ đề thi thông qua luồng đẩy Git của bạn. Dữ liệu mảng tĩnh hoàn toàn độc lập và an toàn.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Danh Sách Bộ Đề Thi (Exam Sets)</h3>
              
              {EXAM_SETS.length === 0 ? (
                /* HIỂN THỊ KHUNG HƯỚNG DẪN KHI CHƯA CÓ BỘ ĐỀ NÀO */
                <div className="border border-dashed border-zinc-800 rounded-3xl p-8 sm:p-12 text-center bg-zinc-950/20 space-y-4 max-w-3xl mx-auto">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mx-auto">
                    ⚠️
                  </div>
                  <h4 className="text-lg font-bold text-zinc-200">Hệ thống chưa nạp bộ đề nào</h4>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                    Mảng <code className="text-emerald-400 font-mono font-bold bg-[#050507] px-2 py-0.5 rounded">EXAM_SETS</code> hiện tại đang trống. Hãy chuẩn bị tệp dữ liệu bộ đề của bạn theo đúng cấu trúc tiêu chuẩn và nạp vào mảng này trong tệp <code className="text-emerald-400 font-mono font-bold bg-[#050507] px-2 py-0.5 rounded">App.jsx</code>, sau đó push code lên Git để tự động render.
                  </p>
                  
                  {/* Hướng dẫn cấu trúc code nhanh */}
                  <div className="text-left rounded-2xl border border-zinc-800 bg-[#050507] p-5 font-mono text-[10px] sm:text-xs text-emerald-400 overflow-x-auto space-y-1">
                    <div>{"// Cấu trúc một bộ đề chuẩn:"}</div>
                    <div>{"const MY_EXAM_SET = ["}</div>
                    <div>{"  {"}</div>
                    <div>{"    id: 101,"}</div>
                    <div>{"    topic: \"Chuyên đề\","}</div>
                    <div>{"    difficulty: \"Trung bình\","}</div>
                    <div>{"    question: \"Nội dung câu hỏi?\","}</div>
                    <div>{"    options: [\"A\", \"B\", \"C\", \"D\"],"}</div>
                    <div>{"    correctAnswer: 0,"}</div>
                    <div>{"    explanation: \"Giải thích chi tiết\""}</div>
                    <div>{"  }"}</div>
                    <div>{"];"}</div>
                  </div>
                </div>
              ) : (
                /* GRID HIỂN THỊ CÁC BỘ ĐỀ */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {EXAM_SETS.map((exam) => (
                    <div key={exam.id} className="bg-zinc-950/60 border border-zinc-800 rounded-3xl p-6 hover:border-emerald-500/40 transition-colors group flex flex-col shadow-lg shadow-black">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                          <Icons.Brain />
                        </div>
                        <span className="px-3 py-1 bg-zinc-900 text-zinc-400 border border-zinc-800 text-xs rounded-full font-mono font-bold">
                          {exam.questionCount} Câu Hỏi
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-zinc-100 mb-2">{exam.title}</h4>
                      <p className="text-sm text-zinc-500 mb-6 flex-1 leading-relaxed">{exam.description}</p>
                      <div className="flex gap-3 mt-auto pt-4 border-t border-zinc-800/50">
                        <button 
                          onClick={() => startMarathon(exam)} 
                          className="flex-1 bg-emerald-500/10 text-emerald-400 font-bold py-2.5 rounded-xl hover:bg-emerald-500 hover:text-zinc-950 transition-all border border-emerald-500/20 text-sm"
                        >
                          Marathon
                        </button>
                        <button 
                          onClick={() => startMockExam(exam)} 
                          className="flex-1 bg-sky-500/10 text-sky-400 font-bold py-2.5 rounded-xl hover:bg-sky-500 hover:text-zinc-950 transition-all border border-sky-500/20 text-sm"
                        >
                          Thi Thử
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==========================================
            CHẾ ĐỘ THI (Marathon / Mock)
            ========================================== */}
        {(activeTab === 'marathon' || activeTab === 'mock') && renderQuizInterface()}

        {/* ==========================================
            KẾT QUẢ THI
            ========================================== */}
        {activeTab === 'results' && (
          <div className="space-y-8 max-w-4xl mx-auto animate-slideUp">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-gradient-to-b from-zinc-950 to-zinc-900 p-8 sm:p-12 text-center shadow-2xl">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-rose-500" />
              <div className="flex justify-center mb-6">
                <Icons.Trophy />
              </div>
              <h2 className="text-3xl font-extrabold text-white">Hoàn Thành Đợt Ôn Tập!</h2>
              <p className="text-zinc-400 text-sm sm:text-base mt-2">Dưới đây là thống kê chi tiết kết quả huấn luyện của bạn đối với {currentExam?.title}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800">
                  <div className="text-3xl font-black text-emerald-400">{resultsMetrics.correct}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mt-1">Chính Xác</div>
                </div>
                <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800">
                  <div className="text-3xl font-black text-rose-500">{resultsMetrics.wrong}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mt-1">Chưa Đúng</div>
                </div>
                <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800">
                  <div className="text-3xl font-black text-zinc-400">{resultsMetrics.unanswered}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mt-1">Bỏ Qua</div>
                </div>
                <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800">
                  <div className="text-3xl font-black text-sky-400">
                    {resultsMetrics.total > 0 ? Math.round((resultsMetrics.correct / resultsMetrics.total) * 100) : 0}%
                  </div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mt-1">Tỷ Lệ Đúng</div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white">Đánh Giá Phân Bổ Kiến Thức</h3>
              <div className="space-y-4">
                {Object.entries(resultsMetrics.topicStats).map(([topic, stats], idx) => {
                  const percent = Math.round((stats.correct / stats.total) * 100) || 0;
                  let barColor = 'bg-rose-500';
                  if (percent >= 80) barColor = 'bg-emerald-500';
                  else if (percent >= 50) barColor = 'bg-amber-500';

                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-bold text-zinc-300">{topic}</span>
                        <span className="font-semibold text-zinc-400">{stats.correct}/{stats.total} ({percent}%)</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <div className={`h-full ${barColor} transition-all duration-500`} style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button 
                onClick={() => startMarathon(currentExam)}
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/10"
              >
                Làm Lại Đề Này
              </button>
              <button 
                onClick={() => setActiveTab('home')}
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-bold px-6 py-3 rounded-xl border border-zinc-800 transition-all"
              >
                Về Trang Chủ
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );

  // ==========================================
  // HÀM RENDER KHUNG CÂU HỎI TRẮC NGHIỆM ĐỘNG
  // ==========================================
  function renderQuizInterface() {
    if (!questionsBank.length) return null;

    const question = questionsBank[currentQuestionIdx];
    const isQuestionSaved = answersState[question.id];
    const savedAnswer = isQuestionSaved ? isQuestionSaved.selected : null;
    const isAnswerCorrect = isQuestionSaved ? isQuestionSaved.isCorrect : false;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-fadeIn">
        {/* Cột trái: Tiến trình */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-zinc-300 text-sm uppercase tracking-wider line-clamp-1">{currentExam?.title}</h3>
            </div>
            
            <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
              <div className="bg-sky-500 h-full transition-all duration-300" style={{width: `${((currentQuestionIdx + 1) / questionsBank.length) * 100}%`}}></div>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500">Tiến độ</span>
              <span className="font-mono bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded-md">
                {currentQuestionIdx + 1} / {questionsBank.length}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2.5 pt-2">
              {questionsBank.map((q, idx) => {
                const state = answersState[q.id];
                let btnStyle = 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700';
                
                if (idx === currentQuestionIdx) {
                  btnStyle = 'border-sky-500 text-sky-400 ring-2 ring-sky-500/20 bg-sky-950/20';
                } else if (state) {
                  if (mockActive) {
                    btnStyle = 'bg-sky-950/40 border-sky-800 text-sky-400';
                  } else {
                    btnStyle = state.isCorrect 
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400' 
                      : 'bg-rose-950/40 border-rose-800 text-rose-400';
                  }
                }

                if (state?.bookmarked) btnStyle += ' ring-1 ring-yellow-500/30';

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestionIdx(idx);
                      const saved = answersState[q.id];
                      if (saved) {
                        setSelectedOption(saved.selected);
                        setIsAnswerSubmitted(!mockActive);
                      } else {
                        setSelectedOption(null);
                        setIsAnswerSubmitted(false);
                      }
                      setShowHint(false);
                    }}
                    className={`h-10 text-xs font-mono font-bold rounded-xl border flex items-center justify-center transition-all ${btnStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-zinc-800 grid grid-cols-2 gap-2 text-[10px] text-zinc-400">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span>Chính xác</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /><span>Chưa đúng</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-500" /><span>Đã làm</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-zinc-700" /><span>Chưa làm</span></div>
            </div>
            
            {mockActive && (
              <button
                onClick={handleMockSubmit}
                className="w-full bg-rose-500/10 border border-rose-800 text-rose-400 hover:bg-rose-500 hover:text-zinc-950 font-bold py-3 rounded-xl transition-all text-xs tracking-wider uppercase mt-4"
              >
                Nộp Bài Thi Ngay
              </button>
            )}
          </div>
        </div>

        {/* Cột phải: Khu vực Câu hỏi */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 relative shadow-lg">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full font-bold">
                  {question.topic}
                </span>
                <span className={`px-2.5 py-0.5 rounded-md font-semibold ${
                  question.difficulty === 'Khó' ? 'bg-rose-500/10 text-rose-400' :
                  question.difficulty === 'Trung bình' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                }`}>
                  Độ khó: {question.difficulty}
                </span>
              </div>
              
              <button onClick={() => toggleBookmark(question.id)} className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors" title="Đánh dấu xem lại">
                <Icons.Bookmark marked={answersState[question.id]?.bookmarked} />
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide leading-relaxed">
                {question.question}
              </h2>

              {question.code && (
                <div className="rounded-2xl border border-zinc-800 overflow-hidden font-mono text-xs sm:text-sm bg-[#050507]">
                  <div className="bg-zinc-900/60 px-4 py-2 flex items-center justify-between border-b border-zinc-800">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">CPython Simulator v3.11</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-emerald-400/90 leading-6">
                    <code>{question.code.join('\n')}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Các tùy chọn đáp án */}
            <div className="grid grid-cols-1 gap-3.5">
              {question.options.map((option, idx) => {
                let cardStyle = 'border-zinc-800 bg-zinc-900/30 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/50';
                
                if (activeTab === 'mock') {
                  if (selectedOption === idx) cardStyle = 'border-sky-500 bg-sky-950/20 text-sky-300';
                } else {
                  if (isAnswerSubmitted) {
                    if (idx === question.correctAnswer) cardStyle = 'border-emerald-500 bg-emerald-950/20 text-emerald-300 ring-1 ring-emerald-500/30';
                    else if (selectedOption === idx) cardStyle = 'border-rose-500 bg-rose-950/20 text-rose-300 ring-1 ring-rose-500/30';
                    else cardStyle = 'border-zinc-800 bg-zinc-900/10 text-zinc-500 opacity-60';
                  } else if (selectedOption === idx) {
                    cardStyle = 'border-sky-500 bg-sky-950/20 text-sky-300';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted && activeTab !== 'mock'}
                    onClick={() => {
                      setSelectedOption(idx);
                      if (activeTab === 'mock') {
                        setAnswersState(prev => ({
                          ...prev,
                          [question.id]: { selected: idx, isCorrect: idx === question.correctAnswer, bookmarked: prev[question.id]?.bookmarked || false }
                        }));
                      }
                    }}
                    className={`p-4 rounded-xl border flex items-start gap-3.5 text-left text-xs sm:text-sm tracking-wide font-medium transition-all ${cardStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-zinc-800 text-zinc-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="mt-0.5 leading-normal">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Vùng Action Nút Bấm */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  disabled={currentQuestionIdx === 0}
                  onClick={prevQuestion}
                  className="p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-200 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Icons.Back />
                </button>
                
                {activeTab !== 'mock' && !isAnswerSubmitted && (
                  <button onClick={() => setShowHint(!showHint)} className="text-xs font-bold text-sky-400 hover:text-sky-300 py-2 px-4 rounded-lg bg-sky-500/5 hover:bg-sky-500/10 border border-sky-500/20 transition-all">
                    {showHint ? "Ẩn Gợi Ý" : "Gợi Ý Trả Lời"}
                  </button>
                )}
                
                <span className="text-xs text-zinc-500 font-mono sm:hidden">
                  Câu {currentQuestionIdx + 1}/{questionsBank.length}
                </span>
              </div>

              <div className="w-full sm:w-auto flex justify-end">
                {activeTab === 'mock' ? (
                  <button
                    onClick={nextQuestion}
                    disabled={currentQuestionIdx === questionsBank.length - 1}
                    className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                  >
                    <span>Câu tiếp theo</span>
                    <Icons.Next />
                  </button>
                ) : !isAnswerSubmitted ? (
                  <button
                    onClick={handleAnswerSubmit}
                    disabled={selectedOption === null}
                    className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-bold px-8 py-3 rounded-xl transition-all disabled:cursor-not-allowed shadow-md shadow-emerald-500/10"
                  >
                    Nộp đáp án
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold px-8 py-3 rounded-xl transition-all shadow-md shadow-sky-500/10 flex items-center justify-center gap-1.5"
                  >
                    <span>{currentQuestionIdx === questionsBank.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}</span>
                    <Icons.Next />
                  </button>
                )}
              </div>
            </div>
            
            {showHint && (
              <div className="p-4 rounded-xl border border-sky-800 bg-sky-950/20 text-xs sm:text-sm text-sky-300 animate-fadeIn animate-duration-300">
                <span className="font-bold uppercase tracking-wider block mb-1">Gợi ý gợi mở tư duy:</span>
                {question.hint}
              </div>
            )}
          </div>

          {/* Hộp giải thích (Marathon Only) */}
          {activeTab !== 'mock' && isAnswerSubmitted && (
            <div className="bg-[#0b0c10] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 animate-slideUp">
              <div className="flex items-center gap-2.5">
                {selectedOption === question.correctAnswer ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">✓</div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center font-bold">✗</div>
                )}
                <div>
                  <h3 className={`font-black text-sm uppercase tracking-wider ${selectedOption === question.correctAnswer ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {selectedOption === question.correctAnswer ? 'ĐÁP ÁN CHÍNH XÁC! (+100 XP)' : 'CỐ GẮNG HƠN Ở CÂU SAU!'}
                  </h3>
                  <p className="text-zinc-500 text-xs mt-0.5">Học tập đa giác quan - Phân tích CPython logic</p>
                </div>
              </div>

              <div className="p-5 bg-zinc-950/80 rounded-2xl border border-zinc-900 text-xs sm:text-sm leading-relaxed space-y-3">
                <div className="flex items-start gap-2">
                  <Icons.Info />
                  <p className="text-zinc-300">
                    <span className="font-bold text-sky-400">Giải thích chuyên sâu:</span> <br />
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}