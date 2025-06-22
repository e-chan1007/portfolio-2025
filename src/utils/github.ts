import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: import.meta.env.GITHUB_TOKEN
});

const starCountCache = new Map<string, number>();

export const getGitHubStarCount = async (id: string): Promise<number> => {
  if (starCountCache.has(id)) {
    return starCountCache.get(id)!;
  }
  const [owner, repo] = id.split("/");
  if (!owner || !repo) {
    throw new Error("Invalid repository format. Use 'owner/repoName'.");
  }
  try {
    const response = await octokit.graphql<{
      repository: {
        stargazerCount: number;
      };
    }>(`
      query {
        repository(owner: "${owner}", name: "${repo}") {
          stargazerCount
        }
      }
    `);
    const starCount = response.repository.stargazerCount;
    starCountCache.set(id, starCount);
    return starCount;
  } catch (error) {
    console.error(`Error fetching star count for ${repo}:`, error);
    return 0;
  }
};
