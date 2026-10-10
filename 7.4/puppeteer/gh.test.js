describe("Github page tests", () => {
  beforeEach(async () => {
    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(60000);
    await page.goto("https://github.com/team");
  }, 60000);

  test("The h1 header content", async () => {
    const firstLink = await page.$("header a");
    if (firstLink) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 60000 }),
        firstLink.click(),
      ]);
    }
    await page.waitForSelector("h1", { timeout: 60000 });
    const title2 = await page.title();
    expect(title2).toContain("GitHub");
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = "a[href*='/signup']";
    await page.waitForSelector(btnSelector, {
      visible: true,
      timeout: 60000,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up");
  }, 60000);
});

describe("Other GitHub pages tests", () => {
  test("Header on Features page", async () => {
    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(60000);
    await page.goto("https://github.com/features");
    await page.waitForSelector("h1", { timeout: 60000 });
    const title = await page.title();
    expect(title).toContain("Features");
  }, 60000);

  test("Header on Enterprise page", async () => {
    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(60000);
    await page.goto("https://github.com/enterprise");
    await page.waitForSelector("h1", { timeout: 60000 });
    const title = await page.title();
    expect(title).toContain("Enterprise");
  }, 60000);

  test("Header on Pricing page", async () => {
    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(60000);
    await page.goto("https://github.com/pricing");
    await page.waitForSelector("h1", { timeout: 60000 });
    const title = await page.title();
    expect(title).toContain("Pricing");
  }, 60000);
});