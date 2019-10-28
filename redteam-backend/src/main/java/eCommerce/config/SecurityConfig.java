package eCommerce.config;

import eCommerce.filters.AuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static eCommerce.constants.StringConstants.*;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .addFilterBefore(new AuthFilter(), AuthFilter.class)
                .authorizeRequests()
                .antMatchers(HttpMethod.GET).permitAll()
                .antMatchers(HttpMethod.POST).hasAuthority(ADMIN_ROLE_TYPE)
                .antMatchers(HttpMethod.PUT).hasAnyAuthority(ADMIN_ROLE_TYPE,CUSTOMER_ROLE_TYPE,EMPLOYEE_ROLE_TYPE)
                .antMatchers(HttpMethod.DELETE).hasAnyAuthority(ADMIN_ROLE_TYPE, CUSTOMER_ROLE_TYPE,EMPLOYEE_ROLE_TYPE)
                .and()
                .sessionManagement().disable()
                .csrf().disable();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers(HttpMethod.OPTIONS);
        web.ignoring().antMatchers("/v2/api-docs", "**/configuration/ui", "/swagger-resources/**",
                "/configuration/security", "/swagger-ui.html**", "/webjars/**", "/login", "/signUp",
                "/users/signUp", "/products/**");
    }
}

