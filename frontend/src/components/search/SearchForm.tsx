import React, { useState, FormEvent } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface SearchFormProps {
  onSearch: (filters: { language: string | null; proficiency: [number, number]; communication: [number, number]; problemSolving: [number, number] }) => void;
}

const levels = ["初学者", "初級", "中級", "上級", "プロ"];

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [language, setLanguage] = useState<string | null>(null);
  const [proficiency, setProficiency] = useState<[number, number]>([0, 4]);
  const [communication, setCommunication] = useState<[number, number]>([1, 5]);
  const [problemSolving, setProblemSolving] = useState<[number, number]>([1, 5]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({ language, proficiency, communication, problemSolving });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>言語</label>
        <select value={language ?? ''} onChange={(e) => setLanguage(e.target.value || null)}>
          <option value="">選択してください</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
          <option value="Ruby">Ruby</option>
        </select>
      </div>
      <div>
        <label>熟練度</label>
        <Slider
          value={proficiency}
          onValueChange={(newValue) => setProficiency(newValue as [number, number])}
          min={0}
          max={4}
          step={1}
          style={{ width: '300px' }} // スライダーの幅を制限
        />
        <div>選択された熟練度: {levels[proficiency[0]]} - {levels[proficiency[1]]}</div>
      </div>
      <div>
        <label>コミュニケーション</label>
        <Slider
          value={communication}
          onValueChange={(newValue) => setCommunication(newValue as [number, number])}
          min={1}
          max={5}
          style={{ width: '300px' }} // スライダーの幅を制限
        />
        <div>選択されたコミュニケーション: {communication.join(' - ')}</div>
      </div>
      <div>
        <label>問題解決</label>
        <Slider
          value={problemSolving}
          onValueChange={(newValue) => setProblemSolving(newValue as [number, number])}
          min={1}
          max={5}
          style={{ width: '300px' }} // スライダーの幅を制限
        />
        <div>選択された問題解決: {problemSolving.join(' - ')}</div>
      </div>
      <Button type="submit">検索</Button>
    </form>
  );
};

export default SearchForm;