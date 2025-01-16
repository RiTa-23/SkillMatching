<?php

namespace App\Services;

use App\Models\Project;
use App\Models\User;

class MatchingService
{
    public function getMatchingUsersForProject(Project $project)
    {
        // プロジェクトの必要な言語を取得
        $requiredLanguages = $project->languages;

        // 全社員のスキルと希望言語を取得
        $users = User::with(['languages', 'hopeLanguages'])->get();

        // マッチング結果を格納する配列
        $matchingResults = [];

        // スキルのマッチ度を計算
        foreach ($users as $user) {
            $matchingScore = 0;

            foreach ($requiredLanguages as $language) {
                $userSkill = $user->languages->firstWhere('language_id', $language->language_id);
                $userPreference = $user->hopeLanguages->contains($language);

                // スキルレベルでスコアを加算（例: レベル * 10）
                if ($userSkill) {
                    $matchingScore += $userSkill->pivot->level * 10;
                }

                // 希望言語なら加点
                if ($userPreference) {
                    $matchingScore += 5;
                }
            }

            // 一定のスコア以上をマッチング対象とする
            if ($matchingScore > 10) {
                $matchingResults[] = [
                    'user' => $user,
                    'score' => $matchingScore,
                ];
            }
        }

        return $matchingResults;
    }
}
