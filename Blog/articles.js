// articles.js

const articles = [
    {
        id: 0,
        title: "Handling 10k RPS: Caching Strategies with Redis",
        category: "System Design",
        date: "Jan 28, 2026",
        readTime: "8 Min Read",
        desc: "When vertical scaling hits a wall, caching is your best friend. We explore patterns like Cache-Aside, Write-Through, and solving the Thundering Herd problem using Redis in a Spring Boot environment.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
        content: `
            <p class="text-xl font-medium text-white mb-8">When a standard monolithic application starts facing high concurrency...</p>
            <h3>The Problem: The Thundering Herd</h3>
            <p>Imagine 1000 users requesting the same resource simultaneously...</p>
            <h3>Strategy 1: Cache-Aside (Lazy Loading)</h3>
            <pre><code class="language-java">// Pseudo Java Code
public Product getProduct(String id) {
    String cacheKey = "product:" + id;
    Product product = redis.get(cacheKey);
    if (product != null) return product;
    
    product = db.findById(id);
    redis.set(cacheKey, product, 60, TimeUnit.MINUTES);
    return product;
}</code></pre>
            <h3>Conclusion</h3>
            <p>Redis is not just a key-value store; it's a critical component...</p>
        `
    },
    {
        id: 1,
        title: "Java Threads vs Virtual Threads: The Project Loom Revolution",
        category: "Backend",
        date: "Jan 15, 2026",
        readTime: "12 Min Read",
        desc: "Project Loom changes the game for high-throughput Java applications. I benchmarked standard platform threads against the new Virtual Threads in Java 21 to see the real-world performance gains.",
        image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2000&auto=format&fit=crop",
        content: `
            <p class="text-xl font-medium text-white mb-8">Java 21 introduced Virtual Threads...</p>
            <h3>The One-Thread-Per-Request Model</h3>
            <p>Historically, web servers like Tomcat assigned one OS thread per HTTP request...</p>
        `
    },
    {
        id: 1771784138498,
        title: "Protecting APIs: Building a Rate Limiter with Redis",
        category: "DevOps",
        date: "Feb 22, 2026",
        readTime: "3 min read",
        desc: "APIs without rate limits are a disaster waiting to happen. Here is how to implement a highly scalable Token Bucket algorithm using Spring Boot and Redis.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2000&auto=format&fit=crop",
        content: `
<p class="text-xl font-light text-gray-300 mb-8 leading-relaxed">APIs without rate limits are a disaster waiting to happen. Whether it is a malicious DDoS attack or a bug in a client's frontend code, you need to protect your backend resources.</p>
<p class="text-xl font-light text-gray-300 mb-8 leading-relaxed">Today, we are going to look at implementing a distributed rate limiter.</p>
<h3>Why use Redis?</h3>
If you are running a single instance of a Spring Boot application, an in-memory rate limiter (like Guava's RateLimiter) works fine. But in a modern microservices architecture, traffic is load-balanced across multiple instances.
<p class="text-xl font-light text-gray-300 mb-8 leading-relaxed">If you use local memory, user <strong>Alice</strong> could hit Instance A 100 times, and Instance B 100 times, bypassing your limit. Redis gives us a <strong>centralized, atomic state</strong> that all instances share.</p>
<h3>The Token Bucket Algorithm</h3>
The Token Bucket is the industry standard for API rate limiting. Imagine a bucket that holds a maximum of 100 tokens. Every time a request comes in, we remove 1 token. If the bucket is empty, we return an <code>HTTP 429 Too Many Requests</code> error.
<p class="text-xl font-light text-gray-300 mb-8 leading-relaxed">Here is a simplified implementation using Java and the Jedis client:</p>
<p class="text-xl font-light text-gray-300 mb-8 leading-relaxed">\`\`\`java<br>@Component<br>public class RateLimiter {<br>    <br>    @Autowired<br>    private JedisPool jedisPool;<br>    <br>    public boolean isAllowed(String userId) {<br>        String key = "rate_limit:" + userId;<br>        <br>        try (Jedis jedis = jedisPool.getResource()) {<br>            long currentCount = jedis.incr(key);<br>            <br>            // If this is the first request, set the expiry time (e.g., 1 minute)<br>            if (currentCount == 1) {<br>                jedis.expire(key, 60);<br>            }<br>            <br>            // Check if they exceeded the limit of 100 requests per minute<br>            if (currentCount > 100) {<br>                return false; <br>            }<br>            <br>            return true;<br>        }<br>    }<br>}</p>
    `
    },
    
];