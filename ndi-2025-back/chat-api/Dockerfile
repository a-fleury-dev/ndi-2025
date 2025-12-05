# ==========================
# 🏗️  Stage 1 — Build with Gradle Wrapper
# ==========================
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

# Copy Gradle wrapper and config files
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

# Copy source
COPY src src

# Make sure wrapper is executable
RUN chmod +x gradlew

# Build the Spring Boot fat jar
RUN ./gradlew clean bootJar --no-daemon --refresh-dependencies

# ==========================
# 🚀 Stage 2 — Run image
# ==========================
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy the jar from builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENV SERVER_PORT=${PORT:-8080}

ENTRYPOINT ["java","-jar","app.jar"]