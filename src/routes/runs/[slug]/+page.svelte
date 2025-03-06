<script lang="ts">
    let { data } = $props();
  
    // Normalize failed_tests to always be an array
    let failedTests = Array.isArray(data.report.failed_tests)
      ? data.report.failed_tests
      : [data.report.failed_tests];
  </script>
  
  <div class="container mx-auto p-4 rounded-lg shadow-xl">
    <!-- Horizontal container with chart and text -->
    <div class="flex items-center justify-between">
      <!-- Pie Chart & Legend -->
      <div class="flex items-center">
        <div 
          class="w-64 h-64 rounded-full shadow-inner"
          style="background-image: conic-gradient(#ef4444 0deg 288deg, #22c55e 288deg 360deg);">
        </div>
  
        <!-- Legend -->
        <div class="ml-6 flex flex-col space-y-2">
          <div class="flex items-center text-white">
            <span class="w-4 h-4 bg-red-500 rounded-full mr-2 shadow"></span>
            <span class="font-medium">80 Failed (80%)</span>
          </div>
          <div class="flex items-center text-white">
            <span class="w-4 h-4 bg-green-500 rounded-full mr-2 shadow"></span>
            <span class="font-medium">20 Passed (20%)</span>
          </div>
        </div>
      </div>
  
      <!-- Text section -->
      <div class="w-1/3 p-4 rounded shadow bg-gray-900">
        <p class="text-lg text-white font-medium">
          This report is brought to you by niggalink AI.
        </p>
      </div>
    </div>
  
    <!-- Table container -->
    <div class="overflow-auto mt-6">
      <table class="min-w-full border-collapse rounded-lg overflow-hidden shadow">
        <thead class="bg-gray-900 text-white">
          <tr>
            <th class="border px-4 py-2">Title</th>
            <th class="border px-4 py-2">Message</th>
            <th class="border px-4 py-2">Path</th>
          </tr>
        </thead>
        <tbody class="text-white">
          {#each failedTests as test}
            <tr>
              <td class="border px-4 py-2">{test.title}</td>
              <td class="border px-4 py-2">{test.message}</td>
              <td class="border px-4 py-2">{test.path}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  