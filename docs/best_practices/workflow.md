# Workflow

## Pivotal Tracker (PT) Workflow
- Once you are assigned a task in PT, you'll have to estimate it if it is a feature. Read one of the retro notes pinned in the **art-frontend-masters** channel, especially the one for _16th October, 2018_, which has a section on **_Agile Estimations_**.
- Use the following PT states on each stage of implementation as explained:
  - **start**: click the `Start` button when you start working on the task. Note that any research done in order to implement a task is part of the work. Therefore, click the start button even of you haven't started actual coding.
  - **finish**: click the `Finish` button once you have raised a pull request (PR) that is ready for complete review.
    - You can have _incomplete review_, which is a review done as you continue working on a task. This type of PR should have the label of `work in progress` in GitHub.
  - **deliver**: click the `Deliver` button once your PR has been merged into develop branch.
    - It is a good practice to always check that your changes work in staging environment as it should
  - **rejected** and **accepted**: The program coordinator will then accept or reject your story once they test the changes in staging. Therefore, you don't have to click any button at this stage.
    - When your story is rejected, click the **Restart** button to restart the whole process again.

## GitHub Workflow
It is recommended that you push whatever code you gave implemented to GitHub, even if the task is incomplete. This will help show your progress on the task at hand.

If you branch is in a state that can be tested, even though it is incomplete, create a PR, add the `work in progress` label and request a review from the TTL or even your peers. This way, you will get early feedback and avoid a lot of refactoring later on.

Once your PR is ready for a complete review, remove the `work in progress` label and let the reviewer(s) know that they can now perform a complete PR review.

Once you action the PR review, and the PR gets approved, do the following:
- merge the PR to the develop branch
- delete the PR branch in GitHub
- test that your changes work in the Heroku and Google Cloud Platform (GCP) staging

It is also recommended that the developers help review their peers code together with the TTL, in order to learn from one another. However, the PR can only be approved by the TTL if it has lots of changes. The developers can approve PRs with minor changes such as updating a url.
