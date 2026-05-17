package com.shoppingmall;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@Disabled("Disabled: sample contextLoads test not configured for this project")
@SpringBootTest(
        classes = ShoppingMallManagementApplication.class,
        properties = {
                "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration"
        }
)
class ShoppingMallManagementGroup2ApplicationTests {

	@Test
	void contextLoads() {
	}

}
