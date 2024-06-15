package io.commuty.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@Configuration
public class JwtConfig {


    private final String oauthPublicKey;
    private final String issuer;

    public JwtConfig(
            @Value("${oauth.publicKey}")  String oauthPublicKey,
            @Value("${oauth.issuer}")  String issuer
    ) {
        this.oauthPublicKey = oauthPublicKey;
        this.issuer = issuer;
    }


    @Bean
    public JWTVerifier verifier() throws InvalidKeySpecException, NoSuchAlgorithmException {
        var key = KeyFactory.getInstance("RSA")
                .generatePublic(new X509EncodedKeySpec(Base64.getDecoder().decode(oauthPublicKey.getBytes())));
        return JWT.require(Algorithm.RSA256((RSAPublicKey) key, null))
                .withIssuer(issuer)
                .build();
    }

}
