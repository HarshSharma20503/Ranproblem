import requests
from bs4 import BeautifulSoup

def get_problem_links():
    try:
        url = "https://leetcode.com/problemset/"

        response = requests.get(url)
        response.raise_for_status()  # Raise an exception if the request was unsuccessful

        soup = BeautifulSoup(response.content, "html.parser")

        links = []
        for link in soup.find_all("a"):
            href = link.get("href")
            if href and "/problems/" in href and "/?envType=daily-question&envId=" in href:
                links.append(href)

        return links

    except requests.exceptions.RequestException as e:
        print("An error occurred while making the request:", str(e))
        return []

    except Exception as e:
        print("An error occurred:", str(e))
        return []

problem_links = get_problem_links()
if problem_links:
    print(problem_links[-1])
