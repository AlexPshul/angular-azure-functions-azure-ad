using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace GeekJokeFetcher
{
    public static class Function1
    {
        [FunctionName("GeekJoke")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "geek-joke")] HttpRequest req,
            ILogger log)
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync("https://geek-jokes.sameerkumar.website/api");
                string content = await response.Content.ReadAsStringAsync();
                string decodedContent = HttpUtility.HtmlDecode(content);

                return new OkObjectResult(decodedContent);
            }
        }
    }
}
