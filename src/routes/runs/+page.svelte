<script lang="ts">
    let { data } = $props();
  </script>
  
  <style>
    h1 {
      font-family: 'Helvetica Neue', sans-serif;
      font-size: 2rem;
      margin-bottom: 1rem;
      text-align: center;
      color: #ffffff;
    }
  
    ul {
    list-style: none;
    padding: 0;
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
    li {
      background-color: #1e1e1e;
      margin-bottom: 0.5rem;
      padding: 1rem;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
  
    li:hover {
      background-color: #333333;
    }
  
    a {
      text-decoration: none;
      color: #4fc3f7;
      font-weight: bold;
    }
  
    a:hover {
      color: #81d4fa;
    }
  </style>
  
  <h1>Runs:</h1>
  
  <ul>
    {#each data.reports as { slug, summary }}
      <li>
        <a href="/runs/{slug}">
          {slug} - {summary?.passed}/{summary?.total} passed
        </a>
      </li>
    {/each}
  </ul>
  