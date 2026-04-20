import { ChevronDown, AlignLeft, RotateCcw, Info, ChevronUp, X } from 'lucide-react';

export default function ProblemView() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Left Panel: Problem Description */}
      <section className="w-2/5 bg-surface-container-low flex flex-col overflow-y-auto scrollbar-hide p-8 relative">
        <div className="max-w-2xl mx-auto w-full">
          <h1 className="font-headline text-3xl font-bold text-on-surface mb-4">Two Sum</h1>
          <div className="flex gap-2 mb-8">
            <span className="bg-secondary-container/20 text-secondary-container px-2 py-1 rounded text-xs font-label uppercase tracking-wider">
              Easy
            </span>
            <span className="bg-surface-container-high text-on-surface-variant px-2 py-1 rounded text-xs font-label">
              Array
            </span>
            <span className="bg-surface-container-high text-on-surface-variant px-2 py-1 rounded text-xs font-label">
              Hash Table
            </span>
          </div>

          <div className="font-body text-on-surface-variant leading-relaxed space-y-4 mb-8 text-sm">
            <p>
              Given an array of integers{' '}
              <code className="bg-surface-container-high text-primary-fixed-dim px-1 py-0.5 rounded font-label text-xs">
                nums
              </code>{' '}
              and an integer{' '}
              <code className="bg-surface-container-high text-primary-fixed-dim px-1 py-0.5 rounded font-label text-xs">
                target
              </code>
              , return indices of the two numbers such that they add up to{' '}
              <code className="bg-surface-container-high text-primary-fixed-dim px-1 py-0.5 rounded font-label text-xs">
                target
              </code>
              .
            </p>
            <p>
              You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
            </p>
            <p>You can return the answer in any order.</p>
          </div>

          <h3 className="font-headline text-lg font-semibold text-on-surface mb-3">Example 1:</h3>
          <div className="bg-surface-container-highest p-4 rounded-lg mb-6 shadow-sm">
            <p className="font-label text-sm text-on-surface-variant mb-1">
              <span className="text-on-surface">Input:</span> nums = [2,7,11,15], target = 9
            </p>
            <p className="font-label text-sm text-on-surface-variant mb-1">
              <span className="text-on-surface">Output:</span> [0,1]
            </p>
            <p className="font-label text-sm text-outline">
              <span className="text-on-surface">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].
            </p>
          </div>

          <h3 className="font-headline text-lg font-semibold text-on-surface mb-3">Constraints:</h3>
          <ul className="list-disc list-inside font-label text-sm text-on-surface-variant space-y-2 mb-8 ml-2">
            <li>
              <code className="text-primary-fixed-dim bg-surface-container-highest px-1 rounded">
                2 &lt;= nums.length &lt;= 10^4
              </code>
            </li>
            <li>
              <code className="text-primary-fixed-dim bg-surface-container-highest px-1 rounded">
                -10^9 &lt;= nums[i] &lt;= 10^9
              </code>
            </li>
            <li>
              <code className="text-primary-fixed-dim bg-surface-container-highest px-1 rounded">
                -10^9 &lt;= target &lt;= 10^9
              </code>
            </li>
            <li>
              <strong>Only one valid answer exists.</strong>
            </li>
          </ul>

          <h3 className="font-headline text-lg font-semibold text-on-surface mb-3">Example Snippets:</h3>
          <ul className="list-disc list-inside font-label text-sm text-on-surface-variant space-y-2 mb-8 ml-2">
            <li>
              <span className="text-on-surface mr-2">Python:</span>
              <code className="text-primary-fixed-dim bg-surface-container-highest px-1 rounded">
                for i, num in enumerate(nums):
              </code>
            </li>
            <li>
              <span className="text-on-surface mr-2">Java:</span>
              <code className="text-primary-fixed-dim bg-surface-container-highest px-1 rounded">
                Map&lt;Integer, Integer&gt; map = new HashMap&lt;&gt;();
              </code>
            </li>
            <li>
              <span className="text-on-surface mr-2">C++:</span>
              <code className="text-primary-fixed-dim bg-surface-container-highest px-1 rounded">
                std::unordered_map&lt;int, int&gt; map;
              </code>
            </li>
          </ul>
        </div>
      </section>

      {/* Right Panel: Editor & Output */}
      <section className="w-3/5 flex flex-col bg-surface relative">
        {/* Editor Header */}
        <div className="h-12 bg-surface-container-low flex items-center justify-between px-4">
          <div className="flex items-center gap-2 relative">
            <select className="bg-surface-container-highest border-none text-on-surface font-label text-sm rounded focus:ring-1 focus:ring-primary-container py-1 pl-2 pr-6 appearance-none cursor-pointer outline-none">
              <option value="python">Python 3</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
            <ChevronDown size={14} className="text-on-surface-variant absolute right-2 pointer-events-none" />
          </div>
          <div className="flex items-center gap-3 text-on-surface-variant">
            <button className="hover:text-on-surface transition-colors" title="Format Document">
              <AlignLeft size={16} />
            </button>
            <button className="hover:text-on-surface transition-colors" title="Reset Code">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="flex-1 overflow-hidden flex bg-[#0d1117]">
          {/* Simulated Line Numbers */}
          <div className="w-12 text-outline font-label text-xs flex flex-col items-end pr-2 pt-4 select-none opacity-50 border-r border-outline-variant/15">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
          </div>
          {/* Code */}
          <div className="flex-1 pt-4 pl-4 font-mono text-sm overflow-auto text-[#c9d1d9] leading-relaxed">
            <pre>
              <code>
                <span className="text-[#ff7b72]">class</span> <span className="text-[#d2a8ff]">Solution</span>:
                <br />
                {'    '}
                <span className="text-[#ff7b72]">def</span> <span className="text-[#d2a8ff]">twoSum</span>(self, nums: <span className="text-[#79c0ff]">List</span>[<span className="text-[#ff7b72]">int</span>], target: <span className="text-[#ff7b72]">int</span>) -&gt; <span className="text-[#79c0ff]">List</span>[<span className="text-[#ff7b72]">int</span>]:
                <br />
                {'        '}
                <span className="text-[#8b949e]"># Write your code here</span>
                <br />
                {'        '}
                <span className="text-[#ff7b72]">pass</span>
              </code>
            </pre>
          </div>
        </div>

        {/* Bottom Panel (Terminal/Output) */}
        <div className="h-64 bg-surface-container-low flex flex-col shadow-[0_-24px_48px_rgba(6,14,32,0.4)] z-10">
          <div className="flex items-center px-4 bg-surface-container-high h-10 gap-6">
            <button className="text-primary border-b-2 border-primary h-full px-2 font-label text-sm font-medium">
              Test Results
            </button>
            <button className="text-on-surface-variant hover:text-on-surface h-full px-2 font-label text-sm transition-colors">
              Output
            </button>
            <button className="text-on-surface-variant hover:text-on-surface h-full px-2 font-label text-sm transition-colors">
              Errors
            </button>
            <div className="ml-auto flex items-center gap-2 text-on-surface-variant">
              <button className="hover:text-on-surface">
                <ChevronUp size={16} />
              </button>
              <button className="hover:text-on-surface">
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-label text-sm text-on-surface-variant bg-surface-container-lowest">
            <div className="flex items-center gap-2 text-outline mb-4">
              <Info size={16} />
              <span>Run your code to see test results here.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
